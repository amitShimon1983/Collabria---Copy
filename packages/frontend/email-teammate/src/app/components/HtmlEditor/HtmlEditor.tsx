import React, { forwardRef, useCallback, useMemo, useRef, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import plugins from 'suneditor/src/plugins';
import { isArray } from 'lodash';
import en from 'suneditor/src/lang/en';
import { SunEditorReactProps } from 'suneditor-react/dist/types/SunEditorReactProps';
import { customImageUpload, hiliteColor, fontColor } from './plugins';
import 'suneditor/dist/css/suneditor.min.css';
import './HtmlEditor.scss';
import { theme, useDeviceContext } from '@harmon.ie/collabria-frontend-shared';

const allPlugins = (Object.keys(plugins) as Array<keyof typeof plugins>).map(key => plugins[key]);

export interface HtmlEditorProps extends SunEditorReactProps {
  instanceId: string;
  topAreaClassName?: string;
  editorAreaClassName?: string;
  imageUploadSizeLimit?: number;
  imageFilesLimit?: number;
  onError?: (message: string) => void;
}

const defaultImageUploadSizeLimit = 1024;
const defaultImageFilesLimit = 3;
const hrStyle = `
  display: flex;
  border-width: 1px 0 0;
  border-color: #000;
  border-image: initial;
  box-shadow: none;
  height: 1px;
`;

const HtmlEditor = forwardRef(
  (
    {
      onError,
      imageUploadSizeLimit,
      imageFilesLimit,
      defaultValue,
      setOptions,
      instanceId,
      topAreaClassName,
      editorAreaClassName,
      ...rest
    }: HtmlEditorProps,
    ref: any
  ) => {
    const imageSizeLimit = imageUploadSizeLimit || defaultImageUploadSizeLimit * 1024;
    const imagesLimit = imageFilesLimit || defaultImageFilesLimit;
    const { isMobile } = useDeviceContext();
    const sunEditorRef = useRef<SunEditorCore>();
    const defaultValueRef = useRef<string>();

    const customizations = theme.getCustomizations();
    const isDarkTheme = customizations?.settings?.theme?.name !== 'default';

    const getSunEditorInstance = useCallback((sunEditor: SunEditorCore) => {
      sunEditorRef.current = sunEditor;
      if (ref) {
        ref.current = sunEditor;
      }
      if (isMobile) {
        sunEditorRef.current.toolbar.hide();
      }
      sunEditorRef.current.setOptions({
        imageUploadSizeLimit: imageSizeLimit,
        linkProtocol: 'http://',
      });
    }, []);

    useEffect(() => {
      if (sunEditorRef.current) {
        sunEditorRef.current.core.context.element.topArea.className = isDarkTheme
          ? 'sun-editor sun-editor-dark'
          : 'sun-editor';
      }
    }, [isDarkTheme]);

    useEffect(() => {
      if (sunEditorRef.current) {
        if (isMobile) {
          sunEditorRef.current.core.context.element.topArea.classList.add('sun-editor-mobile');
        }
        if (topAreaClassName) {
          sunEditorRef.current.core.context.element.topArea.classList.add(topAreaClassName);
        }
      }
    }, [isMobile]);

    const onImageUploadError = useCallback((errorMessage: string) => {
      let error;
      if (errorMessage.indexOf('Size of uploadable total images') !== -1) {
        error = 'You have exceeded the maximum allowed attachments size of 1MB';
      } else {
        error = errorMessage.indexOf(']') !== -1 ? errorMessage.split(']')[1] : errorMessage;
      }
      onError && onError(error);
    }, []);

    const onImageUploadBefore = useCallback((files: Array<File>) => {
      const images = sunEditorRef.current?.getFilesInfo('image');
      if (images && images.length >= imagesLimit) {
        onError && onError(`Sorry, you can upload up to ${imagesLimit} images`);
        return false;
      }

      if (files.length === 0) {
        onError && onError('Please use a valid image file format');
        return false;
      }
      return true;
    }, []);

    const editorPlugins = useMemo(() => {
      const arr = [
        ...allPlugins.filter(({ name }: any) => name !== 'hiliteColor' || name !== 'fontColor'),
        customImageUpload(instanceId),
        hiliteColor,
        fontColor,
      ];
      if (setOptions?.plugins) {
        arr.push(...(setOptions.plugins as any));
      }
      return arr;
    }, []);

    const editorButtonList = useMemo(() => {
      if (setOptions?.buttonList) {
        return setOptions?.buttonList.map(buttons => {
          if (!isArray(buttons)) return buttons;
          return buttons.map((b: any) => {
            if (typeof b === 'string' && b === 'image') {
              return customImageUpload(instanceId);
            }
            return b;
          });
        });
      }
      return [];
    }, []);

    useEffect(() => {
      if (sunEditorRef.current && !defaultValueRef.current && defaultValue) {
        defaultValueRef.current = defaultValue;
        sunEditorRef.current.setContents(defaultValue);
      }
    }, [defaultValue, sunEditorRef]);

    return (
      <SunEditor
        {...rest}
        lang="en"
        setAllPlugins
        getSunEditorInstance={getSunEditorInstance}
        onImageUploadError={onImageUploadError}
        onImageUploadBefore={onImageUploadBefore}
        defaultValue={defaultValue}
        setOptions={{
          ...setOptions,
          lang: en,
          plugins: editorPlugins,
          buttonList: editorButtonList,
          hrItems: [
            { name: 'solid', style: `${hrStyle};border-style: solid none none;` },
            { name: 'dashed', style: `${hrStyle};border-style: dashed none none;` },
            { name: 'dotted', style: `${hrStyle};border-style: dotted none none;` },
          ],
        }}
      />
    );
  }
);

export default HtmlEditor;
